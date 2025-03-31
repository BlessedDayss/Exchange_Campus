import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { compare } from 'bcryptjs';

// Fixed users instead of a database
const users = [
  {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    password: '$2a$10$vSK7I1qG5waBzZxm1FZr4.FJtXPwGMXi.T9yWv9QLU.Db2jTcAmz2', // password123
    role: 'user',
    university: 'Stanford University',
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@example.com',
    password: '$2a$10$vSK7I1qG5waBzZxm1FZr4.FJtXPwGMXi.T9yWv9QLU.Db2jTcAmz2', // password123
    role: 'user',
    university: 'MIT',
  },
  {
    id: '3',
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$vSK7I1qG5waBzZxm1FZr4.FJtXPwGMXi.T9yWv9QLU.Db2jTcAmz2', // password123
    role: 'admin',
    university: 'Harvard',
  }
];

// Extend types for NextAuth
declare module 'next-auth' {
  interface User {
    id: string;
    university?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      university?: string;
      role?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    university?: string;
    role?: string;
  }
}

// Single consistent secret key
const SECRET_KEY = 'mysupersecretkey';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }
        
        // Search for the user among fixed users
        const user = users.find(u => u.email === credentials.email);
        
        if (!user) {
          throw new Error('User not found');
        }
        
        const isPasswordValid = await compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Return user data
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          university: user.university,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // Using single secret key - removing jwt.secret
  secret: SECRET_KEY,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.university = user.university;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.university = token.university as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions); 