exports.up = function (knex, Promise) {
    return knex.schema.createTable("jokes", tbl => {
        tbl.increments();
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
    })
        .createTable('posts', function (posts) {
            posts.increments();
            posts.text('text').notNullable();

            posts
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("jokes").dropTableIfExists('posts')
};