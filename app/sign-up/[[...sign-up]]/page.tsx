import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="authPage">
      <div className="authBrand">
        ORI <span>DEVELOPER</span>
      </div>
      <div className="authFrame">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#183A73",
              colorText: "#171b20",
              colorTextSecondary: "#66707c",
              colorBackground: "#ffffff",
              borderRadius: "10px",
            },
            elements: {
              card: "authCard",
              headerTitle: "authTitle",
              headerSubtitle: "authSubtitle",
              socialButtonsBlockButton: "authSocialButton",
              formButtonPrimary: "authPrimaryButton",
              footerActionLink: "authLink",
            },
          }}
        />
      </div>
    </main>
  );
}
