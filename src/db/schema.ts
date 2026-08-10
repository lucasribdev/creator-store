import { relations, sql } from "drizzle-orm";
import {
	boolean,
	check,
	foreignKey,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const socialLinkType = pgEnum("social_link_type", [
	"instagram",
	"tiktok",
	"youtube",
	"whatsapp",
	"website",
	"other",
]);

const timestamps = {
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
};

const eventTimestamp = {
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
};

export const users = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: text("email").notNull().unique(),
	...timestamps,
});

export const profiles = pgTable(
	"profiles",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.unique(),
		username: varchar("username", { length: 30 }).notNull().unique(),
		displayName: text("display_name").notNull(),
		bio: text("bio"),
		avatarUrl: text("avatar_url"),
		bannerUrl: text("banner_url"),
		isPublished: boolean("is_published").default(false).notNull(),
		publishedAt: timestamp("published_at", { withTimezone: true }),
		...timestamps,
	},
	(table) => [
		index("profiles_username_idx").on(table.username),
		check(
			"profiles_username_lowercase_check",
			sql`${table.username} = lower(${table.username})`,
		),
		check(
			"profiles_username_length_check",
			sql`length(${table.username}) between 3 and 30`,
		),
	],
);

export const socialLinks = pgTable(
	"social_links",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		profileId: uuid("profile_id")
			.notNull()
			.references(() => profiles.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		type: socialLinkType("type").notNull(),
		label: text("label"),
		url: text("url").notNull(),
		position: integer("position").default(0).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		...timestamps,
	},
	(table) => [
		index("social_links_profile_id_idx").on(table.profileId),
		index("social_links_profile_position_idx").on(
			table.profileId,
			table.position,
		),
		check(
			"social_links_position_non_negative_check",
			sql`${table.position} >= 0`,
		),
	],
);

export const products = pgTable(
	"products",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		profileId: uuid("profile_id")
			.notNull()
			.references(() => profiles.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		name: text("name").notNull(),
		description: text("description"),
		imageUrl: text("image_url"),
		externalUrl: text("external_url").notNull(),
		buttonLabel: text("button_label"),
		price: numeric("price", { precision: 12, scale: 2 }),
		previousPrice: numeric("previous_price", { precision: 12, scale: 2 }),
		currency: varchar("currency", { length: 3 }).default("BRL"),
		isActive: boolean("is_active").default(true).notNull(),
		isFeatured: boolean("is_featured").default(false).notNull(),
		position: integer("position").default(0).notNull(),
		...timestamps,
	},
	(table) => [
		unique("products_profile_id_id_unique").on(table.profileId, table.id),
		uniqueIndex("products_one_featured_per_profile_idx")
			.on(table.profileId)
			.where(sql`${table.isFeatured} = true`),
		index("products_profile_id_idx").on(table.profileId),
		index("products_profile_active_idx").on(table.profileId, table.isActive),
		index("products_profile_position_idx").on(table.profileId, table.position),
		check(
			"products_price_non_negative_check",
			sql`${table.price} is null or ${table.price} >= 0`,
		),
		check(
			"products_previous_price_non_negative_check",
			sql`${table.previousPrice} is null or ${table.previousPrice} >= 0`,
		),
		check("products_position_non_negative_check", sql`${table.position} >= 0`),
		check(
			"products_currency_uppercase_check",
			sql`${table.currency} is null or ${table.currency} = upper(${table.currency})`,
		),
	],
);

export const pageViews = pgTable(
	"page_views",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		profileId: uuid("profile_id")
			.notNull()
			.references(() => profiles.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		visitorId: text("visitor_id"),
		referrer: text("referrer"),
		...eventTimestamp,
	},
	(table) => [
		index("page_views_profile_id_idx").on(table.profileId),
		index("page_views_profile_created_at_idx").on(
			table.profileId,
			table.createdAt,
		),
	],
);

export const productClicks = pgTable(
	"product_clicks",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		profileId: uuid("profile_id")
			.notNull()
			.references(() => profiles.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		productId: uuid("product_id").notNull(),
		visitorId: text("visitor_id"),
		referrer: text("referrer"),
		...eventTimestamp,
	},
	(table) => [
		foreignKey({
			name: "product_clicks_profile_product_fk",
			columns: [table.profileId, table.productId],
			foreignColumns: [products.profileId, products.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),
		index("product_clicks_profile_id_idx").on(table.profileId),
		index("product_clicks_product_id_idx").on(table.productId),
		index("product_clicks_product_created_at_idx").on(
			table.productId,
			table.createdAt,
		),
	],
);

export const usersRelations = relations(users, ({ one }) => ({
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.userId],
	}),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
	user: one(users, {
		fields: [profiles.userId],
		references: [users.id],
	}),
	socialLinks: many(socialLinks),
	products: many(products),
	pageViews: many(pageViews),
	productClicks: many(productClicks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
	profile: one(profiles, {
		fields: [socialLinks.profileId],
		references: [profiles.id],
	}),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	profile: one(profiles, {
		fields: [products.profileId],
		references: [profiles.id],
	}),
	productClicks: many(productClicks),
}));

export const pageViewsRelations = relations(pageViews, ({ one }) => ({
	profile: one(profiles, {
		fields: [pageViews.profileId],
		references: [profiles.id],
	}),
}));

export const productClicksRelations = relations(productClicks, ({ one }) => ({
	profile: one(profiles, {
		fields: [productClicks.profileId],
		references: [profiles.id],
	}),
	product: one(products, {
		fields: [productClicks.profileId, productClicks.productId],
		references: [products.profileId, products.id],
	}),
}));
