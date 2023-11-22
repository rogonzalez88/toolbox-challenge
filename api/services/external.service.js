import { get } from '../utils/http.util.js'

/**
 * Get all files from external service
 *
 * @return {Promise} A promise of files response.
 */
export const getAllFiles = () =>
  get('/v1/secret/files').then((res) => ({ data: JSON.parse(res) }))

/**
 * Get details file by name
 *
 * @param  {String} name name of file
 * @return {Promise} A promise of file details
 */
export const getFileDetailsByName = (name) => get(`/v1/secret/file/${name}`)
