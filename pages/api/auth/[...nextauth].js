import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Built-in user array for testing
export const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    // Simple password for testing purposes
    password: 'password123',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@example.com',
    // Simple password for testing purposes
    password: 'password123',
  }
];

export default NextAuth({
  debug: true, // Enable debugging
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize started with:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          return null;
        }

        // Find user by email
        const user = users.find(user => user.email === credentials.email);
        if (!user) {
          console.log('User not found');
          return null;
        }
        
        console.log('User found:', user.email);

        try {
          // Simple password check without hashing for debugging
          const isPasswordValid = credentials.password === user.password;
          
          console.log('Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          console.log('Authorization successful');
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Error checking password:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'YOUR_SECRET_KEY',
}); 