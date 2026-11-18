'use client';

import React from 'react'
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
const FirstStep = ({ onNext }: { onNext: () => void }) => {

    const handleFirstForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Account created successfully! Please check your email for verification.");
        onNext();
    }

    return (
        <div>
            <form onSubmit={handleFirstForm} className={cn("flex flex-col gap-6")}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Create your account</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            Fill in the form below to create your account
                        </p>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" type="text" placeholder="John Doe" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <Input id="confirm-password" type="password" required />
                    </Field>
                    <Field>
                        <Button type="submit">
                            Create Account
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default FirstStep
