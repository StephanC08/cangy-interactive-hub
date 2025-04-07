
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-noir-light rounded-xl border border-mauve/20">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-white">
              Connexion
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Accédez à votre espace membre
            </p>
          </div>
          <div className="mt-8">
            <ClerkSignIn 
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-mauve hover:bg-mauve-dark text-white',
                  card: 'bg-transparent shadow-none',
                  headerTitle: 'text-white',
                  headerSubtitle: 'text-gray-400',
                  formFieldLabel: 'text-white',
                  formFieldInput: 'bg-noir-dark border-mauve/30 text-white',
                  identityPreviewText: 'text-white',
                  identityPreviewEditButtonText: 'text-mauve',
                  footerActionText: 'text-gray-400',
                  footerActionLink: 'text-mauve',
                  dividerText: 'text-gray-400',
                  socialButtonsBlockButton: 'border-mauve/30 text-white',
                  socialButtonsBlockButtonText: 'text-white',
                }
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
