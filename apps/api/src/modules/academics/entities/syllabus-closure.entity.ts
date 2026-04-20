import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

/**
 * SyllabusClosureEntity
 * Implements the Closure Table pattern for high-performance hierarchy traversal.
 * It stores every path from a parent to every descendant (including itself).
 */
@Entity('syllabus_closure')
@Index(['ancestorId', 'descendantId'], { unique: true })
export class SyllabusClosureEntity {
  /**
   * The ID of the parent (or grandparent/root) node.
   */
  @PrimaryColumn('uuid')
  ancestorId: string;

  /**
   * The ID of the child (or grandchild/leaf) node.
   */
  @PrimaryColumn('uuid')
  descendantId: string;

  /**
   * Depth level: 
   * 0 = Self
   * 1 = Direct Child
   * 2 = Grandchild
   */
  @Column({ type: 'int', default: 0 })
  depth: number;
}