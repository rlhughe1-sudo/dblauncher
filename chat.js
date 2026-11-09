const DBLChat = (() => {
  const SUPABASE_URL = "https://tboarkdlmaqokytofypr.supabase.co";
  const SUPABASE_KEY = "sb_publishable_xWj8NJ451dgzBTQ9rNdQpw_wT_TU70u";

  if (!window.supabase) {
    console.error("DBLauncher: Supabase library is missing.");
    return null;
  }

  const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const email = document.querySelector("#chat-email");
  const password = document.querySelector("#chat-password");
  const status = document.querySelector("#chat-status");
  const login = document.querySelector("#chat-login");
  const signup = document.querySelector("#chat-signup");

  login.addEventListener("click", async () => {
    status.textContent = "Signing in...";
    const { error } = await client.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
    });
    status.textContent = error ? error.message : "Signed in successfully!";
  });

  signup.addEventListener("click", async () => {
    status.textContent = "Creating account...";
    const { data, error } = await client.auth.signUp({
      email: email.value.trim(),
      password: password.value
    });

    if (error) status.textContent = error.message;
    else if (data.session) status.textContent = "Account created! You're signed in.";
    else status.textContent = "Account created! Check your email for confirmation.";
  });

  return { client };
})();
