import { ExternalService } from '../services/index.js'
import { HttpError } from '../errors/index.js'
import { validHex } from '../utils/validations.util.js'

/**
 * Controller method to get all files, set the response and catch errors
 *
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getAllFiles = async (_, res, next) => {
  try {
    const { data } = await ExternalService.getAllFiles()
    res.json(data)
  } catch (error) {
    next(new HttpError(error.message, 400))
  }
}

/**
 * Controller method to get all files with details, set the response and catch errors
 *
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getAllFilesWithDetails = async (req, res, next) => {
  try {
    const fileName = req.query.fileName
    const {
      data: { files }
    } = await ExternalService.getAllFiles()
    const filesWithDetails = await Promise.allSettled(
      files.map((file) => ExternalService.getFileDetailsByName(file))
    )
    const lineFiltered = filesWithDetails
      .filter(
        ({ status, value }) =>
          status === 'fulfilled' && value.split('\n').length > 1
      )
      .map(({ value }) => {
        const linesByFile = value
          .split('\n')
          .slice(1)
          .filter((line) => {
            const values = line.split(',')
            return (
              values.length === 4 &&
              !isNaN(values[2]) &&
              validHex(String(values[3]))
            )
          })
        return linesByFile
      })
      .flat()
      .map((line) => {
        const [file, text, number, hex] = line.split(',')
        return {
          file,
          text,
          number: Number(number),
          hex
        }
      })
    let result = files
      .map((file) => ({
        file,
        lines: lineFiltered.filter((line) => line.file === file)
      }))
      .filter((file) => file.lines.length > 0)
    if (fileName) {
      result = result.filter((file) => file.file === fileName)
    }
    res.json(result)
  } catch (error) {
    if (error instanceof HttpError) {
      next(error)
    } else {
      next(new HttpError(error.message, 400))
    }
  }
}
