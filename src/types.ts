export interface Feature {
  title: string;
  items: string[];
}

export interface ComplexityAnalysis {
  operation: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}

export interface Complexity {
  title: string;
  items: ComplexityAnalysis[];
  summary: {
    bestCase: string;
    averageCase: string;
    worstCase: string;
    spaceComplexity: string;
  };
}
