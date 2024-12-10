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

import React, { useState } from "react";
import { Card, CardBody, Form, Grid, GridItem } from "@patternfly/react-core";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "~/components/core";
import { SpaceActionsTable } from "~/components/storage";
import { baseName, deviceChildren } from "~/components/storage/utils";
import { _ } from "~/i18n";
import { PartitionSlot, SpacePolicyAction, StorageDevice } from "~/types/storage";
import { Partition } from "~/api/storage/types/config-model";
import { useConfigModel, useDevices, useSetCustomSpacePolicy } from "~/queries/storage";
import { toStorageDevice } from "./device-utils";
import { sprintf } from "sprintf-js";

const partitionAction = (partition: Partition) => {
  if (partition.delete) return "delete";
  if (partition.resizeIfNeeded) return "resizeIfNeeded";

  return undefined;
};

/**
 * Renders a page that allows the user to select the space policy and actions.
 */
export default function SpacePolicySelection() {
  const { id } = useParams();
  const model = useConfigModel({ suspense: true });
  const devices = useDevices("system", { suspense: true });
  const device = devices.find((d) => baseName(d.name) === id);
  const setCustomSpacePolicy = useSetCustomSpacePolicy();
  const children = deviceChildren(device);
  const drive = model.drives.find((d) => baseName(d.name) === id);

  const partitionDeviceAction = (device: StorageDevice) => {
    const partition = drive.partitions?.find((p) => p.name === device.name);

    return partition ? partitionAction(partition) : undefined;
  };

  const [actions, setActions] = useState(
    children
      .filter((d) => toStorageDevice(d) && partitionDeviceAction(toStorageDevice(d)))
      .map(
        (d: StorageDevice): SpacePolicyAction => ({
          deviceName: toStorageDevice(d).name,
          value: partitionDeviceAction(toStorageDevice(d)),
        }),
      ),
  );

  const navigate = useNavigate();

  const deviceAction = (device: StorageDevice | PartitionSlot) => {
    if (toStorageDevice(device) === undefined) return "keep";

    return actions.find((a) => a.deviceName === toStorageDevice(device).name)?.value || "keep";
  };

  const changeActions = (spaceAction: SpacePolicyAction) => {
    const spaceActions = actions.filter((a) => a.deviceName !== spaceAction.deviceName);
    spaceActions.push(spaceAction);

    setActions(spaceActions);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setCustomSpacePolicy(drive.name, actions);

    navigate("..");
  };

  const xl2Columns = 6;

  return (
    <Page>
      <Page.Header>
        <h2>{sprintf(_("Custom space policy for %s"), device.name)}</h2>
      </Page.Header>

      <Page.Content>
        <Form id="space-policy-form" onSubmit={onSubmit}>
          <Grid hasGutter>
            {children.length > 0 && (
              <GridItem sm={12} xl2={xl2Columns}>
                <Card isFullHeight isRounded>
                  <CardBody>
                    <SpaceActionsTable
                      devices={children}
                      deviceAction={deviceAction}
                      onActionChange={changeActions}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            )}
          </Grid>
        </Form>
      </Page.Content>
      <Page.Actions>
        <Page.Cancel />
        <Page.Submit form="space-policy-form" type="submit" />
      </Page.Actions>
    </Page>
  );
}
