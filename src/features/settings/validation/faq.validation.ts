import z from "zod";

export const faqSchema =(t:any)=> z.object({
  questionEn: z
    .string()
    .min(5, t("English question must be at least 5 characters"))
    .max(100, t("English question must be less than 100 characters"))
    .regex(/^[A-Za-z\s]+$/, t("Enter question English")),
    

  questionAr: z
    .string()
    .min(5, t("Arabic question must be at least 5 characters"))
    .max(100, t("Arabic question must be less than 100 characters"))
    .regex(/^[\u0600-\u06FF\s]+$/, t("Enter question with Arabic")),

  answerEn: z
    .string()
    .min(10, t("English answer must be at least 10 characters"))
    .max(500, t("English answer must be less than 500 characters"))
    .regex(/^[A-Za-z\s]+$/, t("Enter answer with English")),

  answerAr: z
    .string()
    .min(10, t("Arabic answer must be at least 10 characters"))
    .max(500, t("Arabic answer must be less than 500 characters"))
    .regex(/^[\u0600-\u06FF\s]+$/, t("Enter Answer with Arabic")),
});