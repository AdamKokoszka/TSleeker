const errorTranslator = [
  {
    code: 'auth/user-not-found',
    text: 'Nie znaleziono uzytkownika o tym emailu.',
  },
  {
    code: 'auth/invalid-email',
    text: 'Nieprawidłowy email.',
  },
  {
    code: 'auth/wrong-password',
    text: 'Hasło jest nieprawidłowe.',
  },
  {
    code: 'auth/too-many-requests',
    text: 'Za dużo zapytań do bazy. Spróbuj pózniej.',
  },
]
export default errorTranslator
