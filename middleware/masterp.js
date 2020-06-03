export default function({ $auth, redirect, store, app }) {
  if (!app.$cookies.get('masterp')) {
    $auth.logout('local')
  }
}
