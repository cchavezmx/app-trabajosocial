
const _nav =  [
  {
    // division de menu
    _tag: 'CSidebarNavTitle',
    _children: ['Pacientes']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Registro',
    to: '/pacientes/register',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Agregar Nota',
    to: '/pacientes/addNota',
    icon: 'cil-pencil',
  },
  {
    // division de menu
    _tag: 'CSidebarNavTitle',
    _children: ['Consultas']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nota',
    to: '/update/nota',
    icon: 'cil-save'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Reportes',
    to: '/update/reportes',
    icon: 'cil-user'
  },

]

export default _nav
