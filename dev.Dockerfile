FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i --frozen-lockfile && pnpm cache clean; \
    elif [ -f yarn.lock ]; then npm install -g yarn && yarn --frozen-lockfile && yarn cache clean ; \
    elif [ -f package-lock.json ]; then npm ci && npm cache clean --force; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY . .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager
CMD \
    if [ -f pnpm-lock.yaml ]; then pnpm dev; \
    elif [ -f yarn.lock ]; then yarn dev; \
    elif [ -f package-lock.json ]; then npm run dev; \
    else yarn dev; \
    fi
