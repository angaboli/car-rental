import { AppProps } from "next/app";
import { FormProvider } from "@/contexts/formContext";
import  "@/app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
};

export default MyApp;
