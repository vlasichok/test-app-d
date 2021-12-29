const CONTRACT_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  TERMINATED: 'terminated'
}

const PROFILE_TYPE = {
  CLIENT: 'client',
  CONTRACTOR: 'contractor'
}

const HTTP_CODE_ERRORS = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409
}

module.exports = {
  CONTRACT_STATUS,
  PROFILE_TYPE,
  HTTP_CODE_ERRORS
}