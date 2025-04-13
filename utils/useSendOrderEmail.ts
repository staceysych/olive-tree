import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { UseFormReset } from "react-hook-form";
import { BasketType } from "@/types/basket";

export const TEMPLATE_ID = "template_dx2yezj";
export const SERVICE_ID = "service_lgdg0pe";
export const PUBLIC_KEY = "xO2dKs7r0fTnIRq_Y";

type OrderFormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  basket: BasketType;
  deliveryPreference?: string;
  promotion?: string;
  notes?: string;
};

const useSendOrderEmail = ({
  reset,
}: {
  reset: UseFormReset<OrderFormValues>;
}) => {
  const { toast } = useToast();

  const sendEmail = (values: OrderFormValues) => {
    const templateParams = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      location: values.location,
      basket: values.basket,
      deliveryPreference: values.deliveryPreference,
      promotion: values.promotion,
      notes: values.notes,
    };


    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          toast({
            title: "Order received!",
            description: "We'll contact you soon to confirm your order details.",
          });
          reset();
        },
        (error: Error) => {
          console.error("Failed to send email:", error);
          toast({
            title: "Error",
            description: "Failed to send order. Please try again.",
            variant: "destructive",
          });
        }
      );
  };

  return sendEmail;
};

export default useSendOrderEmail; 