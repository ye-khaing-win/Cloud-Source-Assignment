export enum ErrorMessages {
  NOT_FOUND_WITH_ID = 'No resource found with that id.',
  CREDENTIALS_TAKEN = 'Those credentials are already in use by another account. Please select new ones or try logging in instead.',
  CREDENTIALS_INCORRECT = 'Those credentials are incorrect. Please try again.',
  ADMIN_EXISTED = 'Admin user has already existed for the company. Please contact Juncture support team for more information.',
  EMAIL_INCORRECT = 'The email you entered does not match with candidate email address offered by the company. Please use correct email.',
  ACCESS_UNAUTHORIZED = 'You are not authorized to perform this action.',
  PRISMA_DUPLICATED = 'Duplicate field value(s): {{values}}. Please use another one.',
  PRISMA_BELONGED = 'There are some resoureces belonging to this item. Please remove them first.',
}
