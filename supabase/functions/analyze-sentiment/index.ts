
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
    const { ticker, headlines, videoUrls } = await req.json()

    // Mock FinBERT sentiment analysis (replace with actual API call)
    const sentimentResults = headlines.map((headline: string) => {
      const mockSentiment = (Math.random() * 2 - 1) // -1 to 1
      return {
        text: headline,
        sentiment: mockSentiment,
        confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
        label: mockSentiment > 0.2 ? 'positive' : mockSentiment < -0.2 ? 'negative' : 'neutral'
      }
    })

    // Mock facial expression analysis for video thumbnails
    const facialResults = videoUrls?.map((url: string) => ({
      url,
      emotions: {
        positive: Math.random(),
        negative: Math.random(),
        neutral: Math.random()
      },
      confidence: Math.random() * 0.3 + 0.7
    })) || []

    // Calculate overall sentiment score
    const overallSentiment = sentimentResults.reduce((sum, result) => sum + result.sentiment, 0) / sentimentResults.length

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Store timeline data
    await supabase.from('sentiment_timeline').insert({
      ticker_symbol: ticker,
      sentiment_score: overallSentiment,
      source_type: 'news',
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({
        overall_sentiment: overallSentiment,
        headline_sentiments: sentimentResults,
        facial_sentiments: facialResults,
        analysis_timestamp: new Date().toISOString()
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
