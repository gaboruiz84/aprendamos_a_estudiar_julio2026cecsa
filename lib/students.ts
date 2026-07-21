export interface Student {
  name: string
  nie: string
}

export const STUDENTS: Student[] = [
  { name: "ARGUETA MARTINEZ, JENNIFER", nie: "20347331" },
  { name: "DIAZ HERNANDEZ, HERBERTH SAMUEL", nie: "19947328" },
  { name: "MARTINEZ NOLASCO, ANA EMILIA", nie: "3562976" },
  { name: "RAMOS CASTILLO, FANNY LISBETH", nie: "20229293" },
  { name: "ROMERO POSADA, HASLIN DAYANA", nie: "2786491" },
  { name: "CABRERA BELTRAN, MARLON LEVIT", nie: "20218550" },
  { name: "DIAZ CASTILLO, BRYAN EZEQUIEL", nie: "20218561" },
  { name: "HENRIQUEZ SORTO, OLVIN YAHIR", nie: "20347344" },
  { name: "RODRIGUEZ SALMERON, CARLOS FABRICIO", nie: "10289093" },
  { name: "SAGASTUME LOVO, NIXON EDGARDO", nie: "19947414" },
  { name: "BENITEZ SORTO, KEIRY MERARI", nie: "20042690" },
  { name: "MORALES CASTRO, ROSA ELIZABETH", nie: "20323201" },
  { name: "RAMOS POSADA, GENESIS ABIGAIL", nie: "20218604" },
  { name: "SORTO AMAYA, OSCAR EZEQUIEL", nie: "20042871" },
  { name: "SORTO ARGUETA, ALAN SAMIR", nie: "20218617" },
  { name: "ALEMAN ARGUETA, ADA ALICIA", nie: "20042656" },
  { name: "ARGUETA ARGUETA, GERSON ROLANDO", nie: "20042673" },
  { name: "DIAZ HENRIQUEZ, ROSA TATIANA", nie: "20340722" },
  { name: "RAMOS DIAZ, ROSALINDA", nie: "20218602" },
  { name: "RAMOS REQUENO, DANIEL ALEXANDER", nie: "20042845" },
]

export function findStudentByNie(nie: string): Student | undefined {
  return STUDENTS.find((s) => s.nie === nie)
}

export function findStudentByName(query: string): Student[] {
  const q = query.toLowerCase()
  return STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.nie.includes(q),
  )
}
