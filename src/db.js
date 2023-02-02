const fs = require("fs");

class Database {
	constructor() {
		this.nextID = 0;
		try {
			this.data = require("../db/db.json").map(elem => {
				const newElem = { ...elem };
				newElem.id = this.nextID++;
				return newElem;
			});
		} catch (e) {
			// No db.json yet, so just empty array
			this.data = [];
			fs.mkdir("./db/",{recursive: true}, err => {
				if(err) throw err;
			});
		}
	}
	get() {
		return this.data;
	}
	async add(entry) {
		const newEntry = { ...entry };
		newEntry.id = this.nextID++;
		this.data.push(newEntry);
		try {
			await this.write(JSON.stringify(this.data));
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
				const target = this.data[i];
				this.data.splice(i, 1);
				await this.write(JSON.stringify(this.data))
				return target;
			}
		}
		return null;
	}
	/**
	 * @param {string} str The data to write to the database.
	 */
	async write(str) {
		try {
			await fs.promises.writeFile("./db/db.json", str);
		} catch (e) {
			return null;
		}
	}
};


module.exports = new Database();