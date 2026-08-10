CREATE TYPE "public"."social_link_type" AS ENUM('instagram', 'tiktok', 'youtube', 'whatsapp', 'website', 'other');--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"visitor_id" text,
	"referrer" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"visitor_id" text,
	"referrer" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image_url" text,
	"external_url" text NOT NULL,
	"button_label" text,
	"price" numeric(12, 2),
	"previous_price" numeric(12, 2),
	"currency" varchar(3) DEFAULT 'BRL',
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_profile_id_id_unique" UNIQUE("profile_id","id"),
	CONSTRAINT "products_price_non_negative_check" CHECK ("products"."price" is null or "products"."price" >= 0),
	CONSTRAINT "products_previous_price_non_negative_check" CHECK ("products"."previous_price" is null or "products"."previous_price" >= 0),
	CONSTRAINT "products_position_non_negative_check" CHECK ("products"."position" >= 0),
	CONSTRAINT "products_currency_uppercase_check" CHECK ("products"."currency" is null or "products"."currency" = upper("products"."currency"))
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(30) NOT NULL,
	"display_name" text NOT NULL,
	"bio" text,
	"avatar_url" text,
	"banner_url" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username"),
	CONSTRAINT "profiles_username_lowercase_check" CHECK ("profiles"."username" = lower("profiles"."username")),
	CONSTRAINT "profiles_username_length_check" CHECK (length("profiles"."username") between 3 and 30)
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"type" "social_link_type" NOT NULL,
	"label" text,
	"url" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "social_links_position_non_negative_check" CHECK ("social_links"."position" >= 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_clicks" ADD CONSTRAINT "product_clicks_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_clicks" ADD CONSTRAINT "product_clicks_profile_product_fk" FOREIGN KEY ("profile_id","product_id") REFERENCES "public"."products"("profile_id","id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "page_views_profile_id_idx" ON "page_views" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "page_views_profile_created_at_idx" ON "page_views" USING btree ("profile_id","created_at");--> statement-breakpoint
CREATE INDEX "product_clicks_profile_id_idx" ON "product_clicks" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "product_clicks_product_id_idx" ON "product_clicks" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_clicks_product_created_at_idx" ON "product_clicks" USING btree ("product_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "products_one_featured_per_profile_idx" ON "products" USING btree ("profile_id") WHERE "products"."is_featured" = true;--> statement-breakpoint
CREATE INDEX "products_profile_id_idx" ON "products" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "products_profile_active_idx" ON "products" USING btree ("profile_id","is_active");--> statement-breakpoint
CREATE INDEX "products_profile_position_idx" ON "products" USING btree ("profile_id","position");--> statement-breakpoint
CREATE INDEX "profiles_username_idx" ON "profiles" USING btree ("username");--> statement-breakpoint
CREATE INDEX "social_links_profile_id_idx" ON "social_links" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "social_links_profile_position_idx" ON "social_links" USING btree ("profile_id","position");