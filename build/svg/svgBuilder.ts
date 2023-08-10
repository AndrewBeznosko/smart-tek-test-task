import { readFileSync, readdirSync } from 'node:fs'
import type { Plugin } from 'vite'

let idPerfix = ''
const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const hasViewBox = /(viewBox="[^>+].*?")/g

const clearReturn = /(\r)|(\n)/g

function findSvgFile(dir: string): string[] {
  const svgRes = []
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(`${dir + dirent.name}/`))
    }
    else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          // console.log(++i)
          // console.log(dirent.name)
          let width = 0
          let height = 0
          let content = $2.replace(
            clearHeightWidth,
            (s1: unknown, s2: unknown, s3: unknown) => {
              if (s2 === 'width')
                width = s3 as number
              else if (s2 === 'height')
                height = s3 as number

              return ''
            },
          )
          if (!hasViewBox.test($2))
            content += `viewBox="0 0 ${width} ${height}"`

          return `<symbol id="${idPerfix}-${dirent.name.replace(
            '.svg',
            '',
          )}" ${content}>`
        })
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

export function svgBuilder(
  path: string,
  perfix = 'icon',
): Plugin | undefined {
  idPerfix = perfix
  const res = findSvgFile(path)
  // console.log(res.length)
  // const res = []
  return {
    name: 'svg-transform',
    transformIndexHtml(html): string {
      return html.replace(
        '<body>',
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join('')}
            </svg>
        `,
      )
    },
  }
}
