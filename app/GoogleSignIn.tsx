
import './google-sign-in.css'

export function GoogleSignInButton({ children, callback }: any) {
    return (
        <button type="button" className="google-sign-in-button" onClick={callback}>
        Sign in with Google
        </button>
    )
}
