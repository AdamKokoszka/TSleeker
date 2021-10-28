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
  {
    code: 'auth/email-already-in-use',
    text: 'Użytkownik o podanym emailu już istnieje.',
  },
  {
    code: 'auth/invalid-email',
    text: 'Nieprawidłowy email.',
  },
  {
    code: 'auth/invalid-password',
    text: 'Nieprawidłowe hasło.',
  },
  {
    code: 'auth/weak-password',
    text: 'Hasło powinno zawierać conajmniej 6 znaków.',
  },
]
export default errorTranslator
