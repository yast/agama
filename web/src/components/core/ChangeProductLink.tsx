/*
 * Copyright (c) [2024] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
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

import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { useProduct, useRegistration } from "~/queries/software";
import { PRODUCT as PATHS } from "~/routes/paths";
import { _ } from "~/i18n";
import { isEmpty } from "~/utils";

/**
 * Link for navigating to the selection product.
 */
export default function ChangeProductLink({ children, ...props }: Omit<LinkProps, "to">) {
  const { products } = useProduct();
  const registration = useRegistration();

  if (products.length <= 1) return null;
  if (!isEmpty(registration?.key)) return null;

  return (
    <Link to={PATHS.changeProduct} {...props}>
      {children || _("Change product")}
    </Link>
  );
}
