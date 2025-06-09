
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PDFGenerator } from "./pdf/PDFGenerator";
import PDFPreview from "./pdf/PDFPreview";

interface PDFExportProps {
  chartImage?: string;
  gradCamImage?: string;
  pattern: string;
  patternConfidence: number;
  sentiment: number;
  ticker: string;
  recommendation: {
    action: string;
    confidence: number;
    reasoning: string;
    timeframe: string;
  };
}

const PDFExport = ({ 
  chartImage, 
  gradCamImage, 
  pattern, 
  patternConfidence, 
  sentiment, 
  ticker,
  recommendation 
}: PDFExportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const generator = new PDFGenerator();
      const pdf = generator.generateReport({
        chartImage,
        gradCamImage,
        pattern,
        patternConfidence,
        sentiment,
        ticker,
        recommendation
      });
      
      pdf.save(`Sentivision_${ticker}_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success("Trading report exported successfully!");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-400" />
          <span>Export Analysis Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-slate-300 space-y-2">
          <p>Generate a comprehensive PDF report including:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Executive summary with recommendations</li>
            <li>Technical analysis results</li>
            <li>Chart visualizations and Grad-CAM overlays</li>
            <li>AI reasoning and confidence scores</li>
            <li>Risk disclaimers and compliance notes</li>
          </ul>
        </div>

        <PDFPreview
          ticker={ticker}
          pattern={pattern}
          patternConfidence={patternConfidence}
          recommendation={recommendation}
        />

        <Button 
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export PDF Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
