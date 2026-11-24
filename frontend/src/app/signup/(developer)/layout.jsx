
import SignUpShell from "../../_Components/SignUpShell/SignUpShell";
import { SignupProvider } from "../_context/SignupContext";

export default function DeveloperLayout({ children }) {
  return (
    <SignupProvider>
      <SignUpShell>{children}</SignUpShell>
    </SignupProvider>
  );
}
