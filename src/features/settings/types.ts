export type Data = {
  id: number;
  code: string;
  name: string;
  nameAr: string;
  nameEn: string;
  discountPercent: number;
};
export type AddFaqPayload = {
  id:number
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
};

export type UpdateCommunicate = {
    whatsAppNumber: string;
  contactUsEmail: string;
  supportEmail: string;
  businessHours: string;
  timeZone: string;
}
export type ActionState = {
  success: boolean;
  message: string;
};
export type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
};