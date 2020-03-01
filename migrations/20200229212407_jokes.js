exports.up = function (knex, Promise) {
    return knex.schema.createTable("jokes", tbl => {
        tbl.increments();
        tbl.string("joke_title").notNullable();
        tbl.string("joke_question").notNullable();
        tbl.string("joke_answer").notNullable();
        tbl
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("RESTRICT")
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("jokes");
};