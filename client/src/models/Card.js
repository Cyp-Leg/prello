/*export class Card {
    id;              // String
    description;     // String
    isArchived;      // Boolean
}*/

export function Card(id, description, isArchived, dueDate) {
    this.id = id;                   // String
    this.description = description; // String
    this.isArchived = isArchived;   // Boolean
    this.dueDate = dueDate;         // Date
}