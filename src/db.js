const fs = require("fs");

class Database {
	constructor() {
		this.nextID = 0;
		this.data = require("../db/db.json").map(elem => {
			const newElem = { ...elem };
			newElem.id = this.nextID++;
			return newElem;
		});
	}
	get() {
		return this.data;
	}
	async add(entry) {
		const newEntry = { ...entry };
		newEntry.id = this.nextID++;
		this.data.push(newEntry);
		try {
			await fs.promises.writeFile("./db/db.json", JSON.stringify(this.data));
			return newEntry;
		} catch (e) {
			return null;
		}
	}
	async remove(id) {
		if (typeof id !== 'number') throw new Error(`id must be a number, was a ${typeof id}`);
		const length = this.data.length;
		for (let i = 0; i < length; ++i) {
			if (this.data[i].id === id) {
				try {
					const target = this.data[i];
					this.data.splice(i, 1);
					await fs.promises.writeFile("./db/db.json", JSON.stringify(this.data));
					return target;
				} catch (e) {
					return null;
				}
			}
		}
		return null;
	}
};


module.exports = new Database();