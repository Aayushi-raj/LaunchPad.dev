<<<<<<< HEAD
// import type { Config } from "tailwindcss";

// export default {
//     darkMode: ["class"],
//     content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//   	extend: {
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			},
//   			sidebar: {
//   				DEFAULT: 'hsl(var(--sidebar-background))',
//   				foreground: 'hsl(var(--sidebar-foreground))',
//   				primary: 'hsl(var(--sidebar-primary))',
//   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
//   				accent: 'hsl(var(--sidebar-accent))',
//   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
//   				border: 'hsl(var(--sidebar-border))',
//   				ring: 'hsl(var(--sidebar-ring))'
//   			}
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config;


import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
=======
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        background: 'hsl(210, 60%, 98%)',
        foreground: 'hsl(222, 47%, 11%)',
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(222, 47%, 11%)',
        },
        popover: {
          DEFAULT: 'hsl(210, 40%, 96%)',
          foreground: 'hsl(222, 47%, 11%)',
        },
        primary: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(262, 72%, 74%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        muted: {
          DEFAULT: 'hsl(210, 16%, 92%)',
          foreground: 'hsl(215, 20%, 50%)',
        },
        accent: {
          DEFAULT: 'hsl(186, 73%, 60%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 85%, 65%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        border: 'hsl(210, 20%, 90%)',
        input: 'hsl(210, 20%, 96%)',
        ring: 'hsl(217, 91%, 60%)',
        chart: {
          '1': 'hsl(217, 91%, 60%)',
          '2': 'hsl(186, 73%, 60%)',
          '3': 'hsl(262, 72%, 74%)',
          '4': 'hsl(0, 85%, 65%)',
          '5': 'hsl(140, 70%, 50%)'
        },
        sidebar: {
          DEFAULT: 'hsl(210, 36%, 96%)',
          foreground: 'hsl(222, 47%, 11%)',
          primary: 'hsl(217, 91%, 60%)',
          'primary-foreground': 'hsl(0, 0%, 100%)',
          accent: 'hsl(186, 73%, 60%)',
          'accent-foreground': 'hsl(0, 0%, 100%)',
          border: 'hsl(210, 20%, 88%)',
          ring: 'hsl(217, 91%, 60%)'
        }
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        gradientX: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out both',
        pulseScale: 'pulseScale 2s infinite ease-in-out',
        gradientX: 'gradientX 4s ease infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
=======
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        'primary-foreground': "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        'secondary-foreground': "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        'muted-foreground': "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        'accent-foreground': "hsl(var(--accent-foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
      fontFamily: {
        sans: ["Arial", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, require("@tailwindcss/typography")],
};

export default config;
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
