# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Extract i18n translation keys
pnpm i18next-extract
```

## Architecture Overview

### Logo Creation System
The core functionality revolves around a context-driven logo creation system:

- **LogoProvider**: Central state management using React Context (`components/logo-creator/context/logo-context.tsx`)
- **Three Creation Modes**: Manual editor, AI generation, and template gallery
- **Settings-driven Architecture**: All logo properties stored in `LogoSettings` interface with real-time preview updates
- **Animation System**: Comprehensive animation support with presets and custom configurations

### Internationalization
Multi-language support with Japanese as the primary locale:

- **8 Languages**: ja (default), en, de, zh, zh-TW, es, fr, hi
- **Locale-based Routing**: `/app/[locale]/` structure with automatic detection
- **Translation Files**: JSON-based in `/messages/` directory
- **Middleware**: `next-intl` handles routing and locale detection

### Component Organization
- **Modular Structure**: Logo creator is split into context, tabs, modals, and main components
- **UI Components**: Radix UI foundation with custom styling in `/components/ui/`
- **Landing Page**: Sectioned components in `/components/lp/` for marketing pages

### Key Data Flow
1. **LogoSettings** interface defines all logo properties (text, shapes, animations, gradients)
2. **LogoProvider** manages state and provides it to all child components
3. **Real-time Preview**: Changes immediately reflect in the logo preview
4. **Export System**: SVG/PNG generation from the current settings

### External Integrations
- **Analytics**: Amplitude for user tracking
- **Monetization**: Monetag ad integration
- **Feedback**: Slack webhook integration for user feedback
- **AI Features**: NotifyModal for AI feature announcements

### Type Definitions
Core types in `/types/index.ts` define the logo system structure, including TextElement, AnimationSettings, AdvancedShape, and GradientSettings interfaces.