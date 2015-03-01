# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150301202552) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collections", force: :cascade do |t|
    t.boolean  "favorite",     default: false
    t.string   "board_name",   default: "No Board Name",      null: false
    t.string   "min_player",   default: "1",                  null: false
    t.string   "max_player",   default: "4",                  null: false
    t.string   "playtime",     default: "60",                 null: false
    t.string   "published",    default: "NA",                 null: false
    t.boolean  "up_for_trade", default: false
    t.string   "image"
    t.integer  "user_id"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "description",  default: "`Tis a Board Game!"
  end

  add_index "collections", ["user_id"], name: "index_collections_on_user_id", using: :btree

  create_table "testers", force: :cascade do |t|
    t.boolean  "favorite"
    t.string   "board_name"
    t.integer  "min_player"
    t.integer  "max_player"
    t.integer  "playtime"
    t.date     "published"
    t.boolean  "up_for_trade"
    t.string   "comment"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "testers", ["user_id"], name: "index_testers_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "user_name",                           null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "city",                                null: false
    t.string   "zipcode",                             null: false
    t.integer  "exp_level",              default: 1
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "wants", force: :cascade do |t|
    t.boolean  "favorite",                 default: false
    t.string   "board_name",                               null: false
    t.integer  "min_player",               default: 1,     null: false
    t.integer  "max_player",                               null: false
    t.integer  "playtime",                                 null: false
    t.date     "published",                                null: false
    t.string   "comment"
    t.integer  "user_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "board_image_file_name"
    t.string   "board_image_content_type"
    t.integer  "board_image_file_size"
    t.datetime "board_image_updated_at"
  end

  add_index "wants", ["user_id"], name: "index_wants_on_user_id", using: :btree

  add_foreign_key "collections", "users"
  add_foreign_key "testers", "users"
  add_foreign_key "wants", "users"
end
