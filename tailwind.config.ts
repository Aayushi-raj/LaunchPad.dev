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


// import type { Config } from "tailwindcss";

// export default {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: 'hsl(210, 60%, 98%)',
//         foreground: 'hsl(222, 47%, 11%)',
//         card: {
//           DEFAULT: 'hsl(0, 0%, 100%)',
//           foreground: 'hsl(222, 47%, 11%)',
//         },
//         popover: {
//           DEFAULT: 'hsl(210, 40%, 96%)',
//           foreground: 'hsl(222, 47%, 11%)',
//         },
//         primary: {
//           DEFAULT: 'hsl(217, 91%, 60%)',
//           foreground: 'hsl(0, 0%, 100%)',
//         },
//         secondary: {
//           DEFAULT: 'hsl(262, 72%, 74%)',
//           foreground: 'hsl(0, 0%, 100%)',
//         },
//         muted: {
//           DEFAULT: 'hsl(210, 16%, 92%)',
//           foreground: 'hsl(215, 20%, 50%)',
//         },
//         accent: {
//           DEFAULT: 'hsl(186, 73%, 60%)',
//           foreground: 'hsl(0, 0%, 100%)',
//         },
//         destructive: {
//           DEFAULT: 'hsl(0, 85%, 65%)',
//           foreground: 'hsl(0, 0%, 100%)',
//         },
//         border: 'hsl(210, 20%, 90%)',
//         input: 'hsl(210, 20%, 96%)',
//         ring: 'hsl(217, 91%, 60%)',
//         chart: {
//           '1': 'hsl(217, 91%, 60%)',
//           '2': 'hsl(186, 73%, 60%)',
//           '3': 'hsl(262, 72%, 74%)',
//           '4': 'hsl(0, 85%, 65%)',
//           '5': 'hsl(140, 70%, 50%)'
// 		},
// 		// Beautiful pastel bold palette
// 		pastel: {
// 			coral: '#FF6B6B',
// 			pink: '#FF8E8E', 
// 			lavender: '#A78BFA',
// 			mint: '#34D399',
// 			sky: '#38BDF8',
// 			peach: '#FBBF24',
// 			rose: '#FB7185',
// 			cyan: '#22D3EE',
// 			purple: '#8B5CF6',
// 			emerald: '#10B981'
//         },
//         sidebar: {
//           DEFAULT: 'hsl(210, 36%, 96%)',
//           foreground: 'hsl(222, 47%, 11%)',
//           primary: 'hsl(217, 91%, 60%)',
//           'primary-foreground': 'hsl(0, 0%, 100%)',
//           accent: 'hsl(186, 73%, 60%)',
//           'accent-foreground': 'hsl(0, 0%, 100%)',
//           border: 'hsl(210, 20%, 88%)',
//           ring: 'hsl(217, 91%, 60%)'
//         }
//       },
//       borderRadius: {
//         lg: '1rem',
//         md: '0.75rem',
//         sm: '0.5rem',
//       },
//       keyframes: {
//         fadeInUp: {
//           '0%': { opacity: '0', transform: 'translateY(10px)' },
//           '100%': { opacity: '1', transform: 'translateY(0)' },
// 		},
// 		'float': {
// 			'0%, 100%': { transform: 'translateY(0px)' },
// 			'50%': { transform: 'translateY(-20px)' }
// 		},
// 		'pulse-slow': {
// 			'0%, 100%': { opacity: '1' },
// 			'50%': { opacity: '0.5' }
// 		},
// 		'gradient-x': {
// 			'0%, 100%': {
// 				'background-size': '200% 200%',
// 				'background-position': 'left center'
// 			},
// 			'50%': {
// 				'background-size': '200% 200%',
// 				'background-position': 'right center'
// 			}
//         },
		
//         pulseScale: {
//           '0%, 100%': { transform: 'scale(1)' },
//           '50%': { transform: 'scale(1.05)' },
//         },
//         gradientX: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '100%': { backgroundPosition: '100% 50%' },
//         },
//       },
//       animation: {
//         fadeInUp: 'fadeInUp 0.6s ease-out both',
//         pulseScale: 'pulseScale 2s infinite ease-in-out',
// 		'accordion-up': 'accordion-up 0.2s ease-out',
// 		float: 'float 6s ease-in-out infinite',
// 		'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         gradientX: 'gradientX 4s ease infinite',
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config;




import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// ... keep existing code (all color definitions)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// ... keep existing code (accordion keyframes)
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				// New animations
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'glow': {
					'0%, 100%': {
						textShadow: '0 0 5px currentColor'
					},
					'50%': {
						textShadow: '0 0 20px currentColor, 0 0 30px currentColor'
					}
				},
				'count-up': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				}
			},
			animation: {
				// ... keep existing code (existing animations)
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				// New animations
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
				'slide-down': 'slide-down 0.6s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'count-up': 'count-up 0.8s ease-out forwards',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				// Animation delays
				'delay-200': 'animation-delay: 200ms',
				'delay-300': 'animation-delay: 300ms',
				'delay-500': 'animation-delay: 500ms',
				'delay-700': 'animation-delay: 700ms',
				'delay-1000': 'animation-delay: 1000ms',
				'delay-1500': 'animation-delay: 1500ms',
				'delay-2000': 'animation-delay: 2000ms'
			},
			animationDelay: {
				'200': '200ms',
				'300': '300ms',
				'400': '400ms',
				'500': '500ms',
				'600': '600ms',
				'700': '700ms',
				'900': '900ms',
				'1100': '1100ms',
				'1300': '1300ms',
				'1500': '1500ms',
				'1700': '1700ms',
				'1900': '1900ms',
				'2100': '2100ms'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;