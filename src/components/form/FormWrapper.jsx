"use client";
import React from "react";

export function FormWrapper({ children }) {

  const [step, setStep] = React.useState(1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const initialStep = () => setStep((prevStep) => prevStep - 2)

  return (
    <>
    <div className="relative flex h-full flex-col">
    {step === 1 && <p className="text-center pt-4">N&#39;hésitez pas à expliquer en détails votre demande... </p>}
    {step === 2 && <p className="text-center pt-4">Vous pouvez charger des photos pour illustrer vos propos...</p>}
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index + 1 === step,
          nextStep,
          prevStep,
          initialStep,
        });
      })}
    </div>
</>
  );
}
