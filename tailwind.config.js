/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    "./src/**/*.{js,jsx,ts,tsx}",
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
  			border: {
  				DEFAULT: '#334155',
  				muted: '#1e293b'
  			},
  			input: {
  				DEFAULT: '#475569',
  				focus: '#1e293b'
  			},
  			ring: {
  				DEFAULT: '#2563eb',
  				secondary: '#0ea5e9'
  			},
  			background: {
  				DEFAULT: '#0f172a',
  				secondary: '#1e293b',
  				tertiary: '#334155',
  				hover: '#1e293b'
  			},
  			foreground: {
  				DEFAULT: '#f8fafc',
  				muted: '#cbd5e1',
  				subtle: '#94a3b8'
  			},
  			primary: {
  				DEFAULT: '#3b82f6',
  				hover: '#2563eb',
  				active: '#1d4ed8',
  				muted: '#60a5fa',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				DEFAULT: '#475569',
  				hover: '#334155',
  				active: '#1e293b',
  				muted: '#64748b',
  				foreground: '#f8fafc'
  			},
  			destructive: {
  				DEFAULT: '#dc2626',
  				hover: '#b91c1c',
  				active: '#991b1b',
  				muted: '#ef4444',
  				foreground: '#ffffff'
  			},
  			muted: {
  				DEFAULT: '#64748b',
  				hover: '#475569',
  				active: '#334155',
  				foreground: '#e2e8f0'
  			},
  			accent: {
  				DEFAULT: '#0ea5e9',
  				hover: '#0284c7',
  				active: '#0369a1',
  				muted: '#38bdf8',
  				foreground: '#ffffff'
  			},
  			success: {
  				DEFAULT: '#22c55e',
  				hover: '#16a34a',
  				active: '#15803d',
  				muted: '#4ade80',
  				foreground: '#ffffff'
  			},
  			warning: {
  				DEFAULT: '#f59e0b',
  				hover: '#d97706',
  				active: '#b45309',
  				muted: '#fbbf24',
  				foreground: '#ffffff'
  			},
  			popover: {
  				DEFAULT: '#1e293b',
  				hover: '#334155',
  				border: '#334155',
  				foreground: '#f8fafc'
  			},
  			card: {
  				DEFAULT: '#1e293b',
  				hover: '#334155',
  				border: '#334155',
  				foreground: '#f8fafc'
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
  			lg: '1rem',
  			md: '0.75rem',
  			sm: '0.5rem'
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  			DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
  		},
  		keyframes: {
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
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-out': {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			'slide-in': {
  				'0%': {
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-out': {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(100%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'fade-in': 'fade-in 0.2s ease-out',
  			'fade-out': 'fade-out 0.2s ease-out',
  			'slide-in': 'slide-in 0.2s ease-out',
  			'slide-out': 'slide-out 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
 };