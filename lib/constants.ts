export const CAMPAIGN_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  FINISHED: 'finished',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const API_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized',
  SERVER_ERROR: 'Internal server error',
} as const

export const TOAST_DURATION = {
  SHORT: 2000,
  DEFAULT: 3000,
  LONG: 5000,
} as const
