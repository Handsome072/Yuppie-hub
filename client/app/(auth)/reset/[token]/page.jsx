import ResetPassword from "@/components/auth/ResetForm";
import AuthPage from "../../Auth";
export default function NewPasswordPage({ params }) {
  const { token } = params;
  return (
    <>
      <AuthPage>
        <ResetPassword token={token} />
      </AuthPage>
    </>
  );
}
