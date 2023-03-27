import AdminTargets from './auto-schemas'

const exportSchemas = (obj, cs) => {
    Object.entries(obj).forEach(e => {
      if (typeof e[1] === 'object') {
        exportSchemas(e[1], cs)
      } else {
        cs[e[0]] = () => ({
          component: import(`./${e[1]}`),
        })
      }
    })
    return cs
}

export default exportSchemas(AdminTargets, {})
