// Web demo stub — typing analytics are not recorded in the demo.

export type RecordSource = 'todo' | 'goal' | 'editor' | 'project' | 'settings' | 'other';

export function recordEdit(_src: RecordSource, _entityId: string, _text: string): void { }

export function initTypingRecorder(): void { }
