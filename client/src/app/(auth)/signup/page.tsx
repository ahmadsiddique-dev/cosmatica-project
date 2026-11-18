'use client';

import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperList,
    StepperSeparator,
    StepperTrigger,
} from "@/components/ui/stepper";
import FirstStep from "./_components/first-step";
import React from "react";


const steps = [
    {
        value: "account",
        title: "Account Setup",
        description: "Create your account and verify email",
    },
    {
        value: "verification",
        title: "Email Verification",
        description: "Verify your email address to continue",
    },
    {
        value: "profile",
        title: "Profile Information",
        description: "Add your personal details and preferences",
    },
    {
        value: "complete",
        title: "Complete Setup",
        description: "Review and finish your account setup",
    },
];

export default function page() {
    const [step, setStep] = React.useState("account");


    const stepIndex = React.useMemo(
    () => steps.findIndex((s) => s.value === step),
    [step],

  );
    return (
        <Stepper value={step} className="w-full max-w-md">
            <StepperList>
                {steps.map((step) => (
                    <StepperItem key={step.value} value={step.value}>
                        <StepperTrigger>
                            <StepperIndicator />
                        </StepperTrigger>
                        <StepperSeparator />
                    </StepperItem>
                ))}
            </StepperList>
            {steps.map((step) => (
                <StepperContent key={step.value} value={step.value}>
                    {step.value === "account" && (
                        <FirstStep onNext={() => setStep("verification")} />
                    )}
                    {step.value === "verification" && (
                        <div>
                            <h2 className="text-lg font-semibold">Email Verification</h2>
                            <p className="text-sm text-muted-foreground">
                                Please check your email for a verification link to continue.
                            </p>
                        </div>
                    )}
                    {step.value === "profile" && (
                        <div>
                            <h2 className="text-lg font-semibold">Profile Information</h2>
                            <p className="text-sm text-muted-foreground">
                                Fill in your personal details and preferences.
                            </p>
                        </div>
                    )}
                    {step.value === "complete" && (
                        <div>
                            <h2 className="text-lg font-semibold">Complete Setup</h2>
                            <p className="text-sm text-muted-foreground">
                                Review your information and finish setting up your account.
                            </p>
                        </div>
                    )}
                </StepperContent>
            ))}
        </Stepper>
    )
}












