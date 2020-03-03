exports.up = function (knex, Promise) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl
            .string("firstname", 255)
            .notNullable();
        tbl
            .string("lastname", 255)
            .notNullable();
        tbl
            .string("email", 255)
            .notNullable()
            .unique();
        tbl.string("password").notNullable;
        tbl.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};