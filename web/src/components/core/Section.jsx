/*
 * Copyright (c) [2022-2023] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

// @ts-check

import React from "react";
import { Link } from "react-router-dom";
import { Icon } from '~/components/layout';
import { ValidationErrors } from "~/components/core";

/**
 * Renders children into an HTML section
 * @component
 *
 * @example <caption>Simple usage</caption>
 *   <Section title="Users" name="users" icon="manage_accounts">
 *     <UsersSummary />
 *   </Section>
 *
 * @example <caption>A section without title</caption>
 *   <Section aria-label="Users summary">
 *     <UsersSummary />
 *   </Section>
 *
 * @example <caption>A section that allows navigating to a page</caption>
 *   <Section title="Users" name="users" icon="manage_accounts" path="/users">
 *     <UsersSummary />
 *   </Section>
 *
 * @typedef { Object } SectionProps
 * @property {string} [icon] - Name of the section icon. Not rendered if title is not provided.
 * @property {string} [title] - The section title. If not given, aria-label must be provided.
 * @property {string} [name] - The section name. Used to build the header id.
 * @property {string} [path] - Path where the section links to.
 *  when user clicks on the title, used for opening a dialog.
 * @property {boolean} [loading] - Whether the section is busy loading its content or not.
 * @property {import("~/client/mixins").ValidationError[]} [props.errors] - Validation errors to be shown before the title.
 * @property {React.ReactElement} [children] - The section content.
 * @property {string} [aria-label] - aria-label attribute, required if title if not given
 *
 * @param { SectionProps } props
 */
export default function Section({
  icon,
  title,
  name,
  path,
  loading,
  errors,
  children,
  "aria-label": ariaLabel
}) {
  const headerId = `${name || crypto.randomUUID()}-section-header`;

  if (!title && !ariaLabel) {
    console.error("The Section component must have either, a 'title' or an 'aria-label'");
  }

  const Header = () => {
    if (!title?.trim()) return;

    const header = !path?.trim() ? <>{title}</> : <Link to={path} unstable_viewTransition>{title}</Link>;

    return (
      <>
        <Icon name={loading ? "loading" : icon} />
        <h2 id={headerId}>{header}</h2>
      </>
    );
  };

  return (
    <section
      aria-live="polite"
      aria-busy={loading}
      aria-label={ariaLabel || undefined}
      aria-labelledby={ title && !ariaLabel ? headerId : undefined}
    >
      <Header />
      <div className="stack content">
        {errors?.length > 0 &&
          <ValidationErrors errors={errors} title={`${title} errors`} />}
        {children}
      </div>
    </section>
  );
}
