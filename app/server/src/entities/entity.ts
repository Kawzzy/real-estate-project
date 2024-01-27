import { randomUUID } from 'node:crypto';

export abstract class Entity<Props> {

	private _id: string;
	protected props: Props;

	get id(): string {
		return this._id;
	}

	protected constructor(props: Props, id?: string) {
		this.props = props;
		this._id = id ?? randomUUID();
	}

	public equals(entity: Entity<Props>) {
		if (!entity || entity !== this || entity.id !== this._id) {
			return false;
		}

		return true;
	}
}