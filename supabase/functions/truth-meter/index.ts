
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { analysisId, headlineSentiment, facialSentiment } = await req.json()

    // Calculate consistency score between text and facial expressions
    const difference = Math.abs(headlineSentiment - facialSentiment)
    const consistencyScore = Math.max(0, 1 - difference)

    // Generate discrepancy notes
    let discrepancyNotes = ""
    if (difference > 0.5) {
      if (headlineSentiment > facialSentiment) {
        discrepancyNotes = "Headlines appear more positive than facial expressions suggest"
      } else {
        discrepancyNotes = "Facial expressions appear more positive than headline sentiment"
      }
    } else if (difference > 0.3) {
      discrepancyNotes = "Moderate inconsistency detected between text and visual sentiment"
    } else {
      discrepancyNotes = "Good alignment between headline and facial sentiment"
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabase.from('truth_meter_results').insert({
      analysis_id: analysisId,
      headline_sentiment: headlineSentiment,
      facial_sentiment: facialSentiment,
      consistency_score: consistencyScore,
      discrepancy_notes: discrepancyNotes
    }).select().single()

    if (error) throw error

    return new Response(
      JSON.stringify({
        consistency_score: consistencyScore,
        discrepancy_notes: discrepancyNotes,
        truth_rating: consistencyScore > 0.8 ? 'High Truth' : consistencyScore > 0.6 ? 'Moderate Truth' : 'Low Truth'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
