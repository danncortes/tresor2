export default function({ $auth, redirect }) {
  if ($auth.$state.user && !$auth.$state.user.verified) {
    redirect('/verify')
  }
}
