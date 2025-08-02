import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()


if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

// what is the use of this?

// I'll explain this code in detail. This is a Prisma client setup file that's commonly used in Next.js applications. Let's break it down line by line:

// 1. First, the code imports the `PrismaClient` from the `@prisma/client` package:
// ```1:1:src/lib/prisma.ts
// import { PrismaClient } from "@prisma/client"
// ```

// 2. Then, it declares a global type definition to extend the global scope:
// ```3:5:src/lib/prisma.ts
// declare global {
//     var prisma: PrismaClient | undefined
// }
// ```
// This tells TypeScript that there might be a global variable called `prisma` that can be either a `PrismaClient` instance or `undefined`.

// 3. The main Prisma client instance is created:
// ```7:7:src/lib/prisma.ts
// const prisma = globalThis.prisma || new PrismaClient()
// ```
// This line does something clever:
// - It first checks if there's already a Prisma client instance in the global scope (`globalThis.prisma`)
// - If it exists, it uses that instance
// - If it doesn't exist, it creates a new `PrismaClient` instance

// 4. The development environment check:
// ```11:11:src/lib/prisma.ts
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
// ```
// This is a crucial part that prevents multiple Prisma client instances during development:
// - In development, Next.js uses hot reloading which can cause multiple instances of the Prisma client to be created
// - This line stores the Prisma client in the global scope only in development mode
// - In production, it doesn't store the client globally, which is more efficient

// 5. Finally, the Prisma client is exported:
// ```13:13:src/lib/prisma.ts
// export default prisma
// ```

// This pattern is known as the "Prisma Client Singleton Pattern" and it's important for several reasons:
// 1. **Performance**: It prevents creating multiple database connections
// 2. **Resource Management**: It ensures efficient use of database connections
// 3. **Development Experience**: It works well with Next.js's hot reloading feature
// 4. **Type Safety**: It provides proper TypeScript support through the global declaration

// This is a standard setup for using Prisma in a Next.js application, and it's considered a best practice to prevent issues with multiple database connections and to ensure proper resource management.

