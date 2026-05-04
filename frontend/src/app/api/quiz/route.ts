import { NextResponse } from 'next/server';
import { generateQuizQuestion } from '@/services/gemini';

export async function POST(req: Request) {
  try {
    const { mode } = await req.json();
    
    // Call the newly separated Gemini service
    const quizData = await generateQuizQuestion(mode);
    
    return NextResponse.json(quizData);

  } catch (error: any) {
    console.error("Quiz API Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." }, 
      { status: 500 }
    );
  }
}
