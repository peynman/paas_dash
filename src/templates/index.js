import TemplateCentered from './Centered/schema'
// import TemplateDashboard from './Dashboard/schema'

const Templates = [
  TemplateCentered,
  // TemplateDashboard,
]

export default Templates

export const TemplatesDictionary = Templates.reduce((dic, c) => {
  dic[c.name] = c.factory
  return dic
}, {})
